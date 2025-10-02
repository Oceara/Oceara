import express from 'express';
import { requireRole, authenticateToken } from '../middleware/auth';
import { issueERC721Credit, issueERC1155Credits } from '../services/chainService';

const router = express.Router();

// Issue ERC-721 credit upon admin approval
router.post('/approve/erc721', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { to, tons, tokenURI } = req.body;
    if (!to || !tons || !tokenURI) return res.status(400).json({ error: 'Missing to/tons/tokenURI' });
    const receipt = await issueERC721Credit(to, Number(tons), tokenURI);
    res.json({ message: 'ERC721 issued', tx: receipt.transactionHash });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('ERC721 approval error:', error);
    res.status(500).json({ error: error.message || 'Failed to issue ERC721' });
  }
});

// Issue ERC-1155 batch credits upon admin approval
router.post('/approve/erc1155', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { to, id, amount, tokenURI } = req.body;
    if (!to || id === undefined || !amount || tokenURI === undefined) {
      return res.status(400).json({ error: 'Missing to/id/amount/tokenURI' });
    }
    const receipt = await issueERC1155Credits(to, Number(id), Number(amount), tokenURI);
    res.json({ message: 'ERC1155 issued', tx: receipt.transactionHash });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('ERC1155 approval error:', error);
    res.status(500).json({ error: error.message || 'Failed to issue ERC1155' });
  }
});

export default router;


